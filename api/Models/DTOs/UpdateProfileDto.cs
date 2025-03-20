namespace Models.DTO
{
    public class UpdateProfileDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        // Patient-specific fields
        public string BloodGroup { get; set; }
        public string MedicalHistory { get; set; }
        public string Address { get; set; }

        // Doctor-specific fields
        public string Specialization { get; set; }
        public string HospitalName { get; set; }
    }
}