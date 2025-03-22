using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Data.ApplicationDb;

namespace Models.Prescription
{
    public class Prescription
    {
        [Key]
        public Guid Id { get; set; } // Unique ID for the prescription

        [Required]
        public string DoctorId { get; set; } // Foreign key to the doctor

        [Required]
        public string PatientId { get; set; } // Foreign key to the patient

        // [ForeignKey("DoctorId")]
        // public virtual Doctors Doctor { get; set; } // Navigation property for the doctor

        // [ForeignKey("PatientId")]
        // public virtual Patients Patient { get; set; } // Navigation property for the patient

        [Required]
        [MaxLength(1000)]
        public string Details { get; set; } // Prescription details (e.g., medications, dosage)

        [Required]
        public DateTime Date { get; set; } = DateTime.UtcNow; // Date when the prescription was written
    }
}