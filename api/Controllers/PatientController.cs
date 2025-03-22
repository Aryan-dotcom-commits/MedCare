using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models.ApplicationUsers;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Data.ApplicationDb;
using Models.DTO;
using Models.Users;
using Models.Appointment;
using Models.Doctors;
using Models.Prescription;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Controller.PatientController {
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        
        
        public PatientController(ApplicationDbContext db, UserManager<ApplicationUser> userManager) {
            _db = db;
            _userManager = userManager;
        }

        // GET: /api/patient
        [HttpGet]
        public IActionResult GetAllPatient() {
            var existingUser = _db.Patients.ToList();
            return Ok(existingUser);
        }

        [HttpDelete("patient/{id}")]
        public async Task<IActionResult> DeletePatient([FromRoute] string id)
        {
            // Ensure the user is authenticated
            var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            // Find the patient by ID
            var patient = await _db.Patients.FirstOrDefaultAsync(p => p.UserId == id);
            if (patient == null)
                return NotFound("Patient not found.");

            // Get the current user and their roles
            var currentUser = await _userManager.FindByIdAsync(currentUserId);
            var roles = await _userManager.GetRolesAsync(currentUser);

            // Ensure only the patient themselves or an admin can delete the account
            if (currentUser.Id != patient.UserId && !roles.Contains("Admin"))
                return Forbid("You are not authorized to delete this patient.");

            // Find the associated ApplicationUser
            var user = await _userManager.FindByIdAsync(patient.UserId);
            if (user == null)
                return BadRequest("User account not found.");

            // Remove the patient record
            _db.Patients.Remove(patient);

            // Delete the user account from the Identity system
            var deleteResult = await _userManager.DeleteAsync(user);
            if (!deleteResult.Succeeded)
                return BadRequest("Failed to delete user account.");

            // Save changes to the database
            await _db.SaveChangesAsync();

            return Ok(new { message = "Patient deleted successfully." });
        }

        [HttpGet("[controller]/appointment")]
        public IActionResult GetAppointments() {
            var appointment = _db.Appointments.ToList();
            return Ok(appointment);
        }

        [HttpPost("/createAppointment")]
        [Authorize(Roles = "Patient")] // Only patients can book appointments
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentDto appointmentDto)
        {
            // Ensure the user is authenticated
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            // Find the patient who requested the appointment
            var patient = await _db.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient == null)
                return NotFound("Patient not found.");

            // Find the doctor by ID
            var doctor = await _db.Doctors.FirstOrDefaultAsync(d => d.Id ==appointmentDto.DoctorId);
            if (doctor == null)
                return NotFound("Doctor not found.");

            // Validate the appointment time
            if (appointmentDto.AppointmentTime <= DateTime.UtcNow)
                return BadRequest("Appointment time must be in the future.");

            // Create the new appointment
            var newAppointment = new Appointment
            {
                AppointmentTime = appointmentDto.AppointmentTime,
                ReasonForVisit = appointmentDto.ReasonForVisit,
                IsConfirmed = false // Default to unconfirmed
            };

            // Save the appointment to the database
            _db.Appointments.Add(newAppointment);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Appointment booked successfully.", appointment = newAppointment });
        }
    }
}