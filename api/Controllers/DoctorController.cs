using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models.ApplicationUsers;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Data.ApplicationDb;
using Models.DTO;
using Models.User;      
using Models.Doctor;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Controller.DoctorController {
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase {
        private readonly ApplicationDbContext _db;

        public DoctorController(ApplicationDbContext db) {
            _db = db;
        }


        [HttpGet]
        public IActionResult GetDoctors() {
            var existingDocs = _db.Doctors.ToList();
            return Ok(existingDocs);
        }
    }   
}