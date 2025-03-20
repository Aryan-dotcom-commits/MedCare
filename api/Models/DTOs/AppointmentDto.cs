using System;

namespace Models.DTO
{
    public class AppointmentDto
    {
        public string PatientId { get; set; }
        public string Name { get; set; }
        public string ReasonForVisit { get; set; }
        public string DoctorToVisit { get; set; }
        public DateTime AppointmentTime { get; set; }
        public DateTime Date { get; set; }
    }
}