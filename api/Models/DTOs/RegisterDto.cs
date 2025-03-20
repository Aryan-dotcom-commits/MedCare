namespace Models.DTO {
    public class RegisterDto {
        // Common Fields
        public string Name { get; set; } // Full name of the user
        public string Email { get; set; } // Email address of the user
        public string Password { get; set; } // Password for the account

        // Role (Patient or Doctor)
        public string Role { get; set; } // "Patient" or "Doctor"

        // Patient-Specific Fields
        public string? BloodGroup { get; set; } // Optional for patients
        public string? MedicalHistory { get; set; } // Optional for patients

        // Doctor-Specific Fields
        public string? Specialization { get; set; } // Required for doctors
        public string? HospitalName { get; set; } // Required for doctors

        public string Phone { get; set; }
        public string Address { get; set; }
    }
}