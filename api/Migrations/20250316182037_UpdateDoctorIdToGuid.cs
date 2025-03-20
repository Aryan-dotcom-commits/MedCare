using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDoctorIdToGuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "321e2b46-d35e-4203-a3a5-f54c521de748");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5ada31b-15f1-4680-ab7a-f11a159352aa");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34260e60-682c-4e2d-a8a7-52d8ed0111bc", null, "Doctor", "DOCTOR" },
                    { "d3121505-4df9-45de-9eb3-fe6d92ca8325", null, "Patient", "PATIENT" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34260e60-682c-4e2d-a8a7-52d8ed0111bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3121505-4df9-45de-9eb3-fe6d92ca8325");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "321e2b46-d35e-4203-a3a5-f54c521de748", null, "Doctor", "DOCTOR" },
                    { "f5ada31b-15f1-4680-ab7a-f11a159352aa", null, "Patient", "PATIENT" }
                });
        }
    }
}
