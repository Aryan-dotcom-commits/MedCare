// Models/ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace Models.ApplicationUsers {
    public class ApplicationUser : IdentityUser
    {
        public string? Role { get; set; } // "Patient" or "Doctor"
    }
}