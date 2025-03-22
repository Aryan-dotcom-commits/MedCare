using System.ComponentModel.DataAnnotations;
using Models.ApplicationUsers;

namespace Models.Doctors {
    public class Doctor
    {
        [Key]
        public Guid Id{ get; set; }
        public string UserId {get; set;} = string.Empty;
        [Required]
        [EmailAddress]
        public string DocEmail {get; set;} = string.Empty;
        public string Docname {get; set;} = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string HospitalName {get; set;} = string.Empty;

        public ApplicationUser User { get; set; } // Navigation property
    }
}