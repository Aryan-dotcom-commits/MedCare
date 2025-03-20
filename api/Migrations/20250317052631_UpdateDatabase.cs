using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34260e60-682c-4e2d-a8a7-52d8ed0111bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d3121505-4df9-45de-9eb3-fe6d92ca8325");

            migrationBuilder.AddColumn<string>(
                name: "UserPassword",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2e26f0dc-0d17-4260-9924-f96be40f97f6", null, "Patient", "PATIENT" },
                    { "ad9079ce-0be1-45ab-a1c6-1a1793c07a72", null, "Doctor", "DOCTOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2e26f0dc-0d17-4260-9924-f96be40f97f6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad9079ce-0be1-45ab-a1c6-1a1793c07a72");

            migrationBuilder.DropColumn(
                name: "UserPassword",
                table: "Patients");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34260e60-682c-4e2d-a8a7-52d8ed0111bc", null, "Doctor", "DOCTOR" },
                    { "d3121505-4df9-45de-9eb3-fe6d92ca8325", null, "Patient", "PATIENT" }
                });
        }
    }
}
