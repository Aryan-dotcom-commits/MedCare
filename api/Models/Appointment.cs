using System;

namespace Models.Appointment
{
    public class Appointment
    {
        public int Id { get; set; } // Unique ID for the appointment
        public string PatientId { get; set; } // Foreign key to the patient
        public string DoctorId { get; set; } // Foreign key to the doctor
        public DateTime AppointmentTime { get; set; } // Time of the appointment
        public DateTime Date { get; set; } // Date of the appointment
        public string Name { get; set; } // Patient's name
        public string ReasonForVisit { get; set; } // Reason for the visit
        public string DoctorToVisit { get; set; } // Doctor's name or specialization
        public bool IsConfirmed { get; set; } = false; // Whether the doctor has confirmed the appointment
    }
}