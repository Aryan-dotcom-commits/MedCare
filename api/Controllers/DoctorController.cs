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
using Models.Prescription;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Controller.DoctorController {
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public DoctorController(ApplicationDbContext db, UserManager<ApplicationUser> userManager) {
            _db = db;
            _userManager = userManager;
        }


        [HttpGet]
        public IActionResult GetDoctors() {
            var existingDocs = _db.Doctors.ToList();
            return Ok(existingDocs);
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var doctor = await _db.Doctors.FirstOrDefaultAsync(d => d.UserId == userId);
            if (doctor == null)
                return NotFound("Doctor not found.");

            var patients = await _db.Patients
                .Where(p => p.Id == doctor.Id)
                .ToListAsync();

            return Ok(patients);
        }


        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateProfileDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            user.UserName = updateProfileDto.UserName;
            user.Email = updateProfileDto.Email;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest("Failed to update user details.");

            var doctor = await _db.Doctors.FirstOrDefaultAsync(d => d.UserId == userId);
            if (doctor != null)
            {
                doctor.Specialization = updateProfileDto.Specialization;
                doctor.HospitalName = updateProfileDto.HospitalName;
            }

            await _db.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully." });
        }
    }   
}