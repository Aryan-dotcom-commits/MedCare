using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DTO
{
    public class AppointmentDto
    {
        [Required]
        public Guid DoctorId { get; set; } // ID of the doctor

        [Required]
        public DateTime AppointmentTime { get; set; } // Date and time of the appointment

        [Required]
        [MaxLength(500)]
        public string ReasonForVisit { get; set; } // Reason for the visit
    }
}