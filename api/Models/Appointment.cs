using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models.Doctors;
using Models.Users;

namespace Models.Appointment
{
    public class Appointment
    {
        [Key]
        public Guid Id { get; set; } // Unique ID for the appointment

        [Required]
        public Guid PatientId { get; set; } // Foreign key to the patient

        [Required]
        public Guid DoctorId { get; set; } // Foreign key to the doctor

        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; } // Navigation property for the patient

        [ForeignKey("DoctorId")]
        public virtual Doctor Doctor { get; set; } // Navigation property for the doctor

        [Required]
        public DateTime AppointmentTime { get; set; } // Date and time of the appointment

        [Required]
        [MaxLength(500)]
        public string ReasonForVisit { get; set; } // Reason for the visit

        public bool IsConfirmed { get; set; } = false; // Whether the appointment is confirmed
    }
}