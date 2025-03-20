using System.ComponentModel.DataAnnotations;
using Models.ApplicationUsers;

namespace Models.User {
    public class Patient
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } // Foreign key to ApplicationUser

        [Required]
        [EmailAddress]
        public string UserEmail {get; set;} = string.Empty;
        public string Username {get; set;} = string.Empty;
        public string BloodGroup { get; set; } = string.Empty;
        public string MedicalHistory { get; set; } = string.Empty;
        public string UserPassword {get; set;} = string.Empty;
        public string Address {get; set;} = string.Empty;
        public string Phone {get; set;} = string.Empty;

        public ApplicationUser User { get; set; } // Navigation property
    }
}