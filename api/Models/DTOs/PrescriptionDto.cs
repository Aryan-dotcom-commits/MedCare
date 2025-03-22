using System.ComponentModel.DataAnnotations;

namespace Models.DTO
{
    public class PrescriptionDto
    {
        [Required]
        public Guid PatientId { get; set; } // ID of the patient receiving the prescription

        [Required]
        [MaxLength(1000)]
        public string Details { get; set; } // Prescription details (e.g., medications, dosage)
    }
}