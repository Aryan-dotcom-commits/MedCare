using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FinalCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "32a3e4d7-f4a3-482b-bbef-015337730f16");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "45aa16d4-d8b2-449b-903b-9d8f7e82c0cf");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Doctors",
                newName: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "321e2b46-d35e-4203-a3a5-f54c521de748", null, "Doctor", "DOCTOR" },
                    { "f5ada31b-15f1-4680-ab7a-f11a159352aa", null, "Patient", "PATIENT" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "321e2b46-d35e-4203-a3a5-f54c521de748");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5ada31b-15f1-4680-ab7a-f11a159352aa");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Doctors",
                newName: "ID");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "32a3e4d7-f4a3-482b-bbef-015337730f16", null, "Doctor", "DOCTOR" },
                    { "45aa16d4-d8b2-449b-903b-9d8f7e82c0cf", null, "Patient", "PATIENT" }
                });
        }
    }
}
