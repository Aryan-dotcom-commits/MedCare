using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models.ApplicationUsers;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Data.ApplicationDb;
using Models.DTO;
using Models.Users;      
using Models.Doctors;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Data.EmailServices;

namespace Controller.AuthController {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        // Single constructor with all required dependencies
        [ActivatorUtilitiesConstructor]
        public AuthController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            EmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _emailService = emailService;
        }

        // GET: /api/patient
        [HttpGet]
        public IActionResult GetNames()
        {
            var existingDocs = _context.Doctors.ToList();
            var existingUser = _context.Patients.ToList();
            return Ok(existingUser);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            Console.WriteLine("Received registration data:");
            Console.WriteLine($"Name: {registerDto.Name}, Email: {registerDto.Email}, Role: {registerDto.Role}");

        // Validate the request payload
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            Console.WriteLine("Validation errors: " + string.Join(", ", errors));
            return BadRequest(new { message = "Invalid input.", errors });
        }

        // Check if the user already exists
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            Console.WriteLine("User already exists with email: " + registerDto.Email);
            return BadRequest("A user with this email already exists.");
        }

        // Create a new user
        var newUser = new ApplicationUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
        };

        // Add user to Identity system
        var result = await _userManager.CreateAsync(newUser, registerDto.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            Console.WriteLine("User creation failed with errors: " + string.Join(", ", errors));
            return BadRequest(new { message = "Registration failed.", errors });
        }

        // Assign role (Patient or Doctor)
        await _userManager.AddToRoleAsync(newUser, registerDto.Role);

        // Create Patient or Doctor record
        if (registerDto.Role == "Patient")
        {
            var patient = new Patient
            {
                UserId = newUser.Id,
                BloodGroup = registerDto.BloodGroup,
                MedicalHistory = registerDto.MedicalHistory,
                Username = registerDto.Name, // Ensure this matches the database schema
                UserEmail = registerDto.Email,
                UserPassword = registerDto.Password,
                Phone = registerDto.Phone, // Save phone number
                Address = registerDto.Address // Save address
            };
            _context.Patients.Add(patient);
            Console.WriteLine("Patient record created: " + patient.Username);
        }
        else if (registerDto.Role == "Doctor")
        {
            var doctor = new Doctor
            {
                UserId = newUser.Id,
                Specialization = registerDto.Specialization,
                HospitalName = registerDto.HospitalName,
            };
            _context.Doctors.Add(doctor);
            Console.WriteLine("Doctor record created: " + doctor.Specialization);
        }

        // Save changes to the database
            await _context.SaveChangesAsync();

            Console.WriteLine("Registration successful for user: " + newUser.Email);
            try
            {
                var emailBody = $"Hello {registerDto.Name},\n\nThank you for registering with MedicareApp!";
                _emailService.SendEmail("hello@demomailtrap.co", registerDto.Email, "Registration Successful", emailBody);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
                // Optionally, log the error but do not block registration
            }

            
            return Ok(new { message = "Registration successful." });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

            var profile = new
            {
                user.Id,
                user.UserName,
                user.Email,
                Role = role,
                BloodGroup = role == "Patient" ? _context.Patients.FirstOrDefault(p => p.UserId == userId)?.BloodGroup : null,
                MedicalHistory = role == "Patient" ? _context.Patients.FirstOrDefault(p => p.UserId == userId)?.MedicalHistory : null,
                Specialization = role == "Doctor" ? _context.Doctors.FirstOrDefault(d => d.UserId == userId)?.Specialization : null,
                HospitalName = role == "Doctor" ? _context.Doctors.FirstOrDefault(d => d.UserId == userId)?.HospitalName : null,
            };

            return Ok(profile);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto) {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if(user == null) {
                return BadRequest("Email doesn't exist.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, lockoutOnFailure: false);
            if (!result.Succeeded)
                return BadRequest("Invalid email or password.");

            var roles = await _userManager.GetRolesAsync(user);

            // Generate JWT Token
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, roles.FirstOrDefault() ?? "User")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Return success response
            return Ok(new
            {
                message = "Login successful.",
                token = tokenString,
                user = new
                {
                    id = user.Id,
                    name = user.UserName,
                    email = user.Email,
                    role = roles.FirstOrDefault()
                }
            });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateProfileDto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            // Update user fields
            user.UserName = updateProfileDto.UserName;
            user.Email = updateProfileDto.Email;
            user.PhoneNumber = updateProfileDto.Phone;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest("Failed to update user details.");

            // Update role-specific fields
            var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            if (role == "Patient")
            {
                var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
                if (patient != null)
                {
                    patient.BloodGroup = updateProfileDto.BloodGroup;
                    patient.MedicalHistory = updateProfileDto.MedicalHistory;
                    
                }
            }
            else if (role == "Doctor")
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.UserId == userId);
                if (doctor != null)
                {
                    doctor.Specialization = updateProfileDto.Specialization;
                    doctor.HospitalName = updateProfileDto.HospitalName;
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully." });
        }
    }
}