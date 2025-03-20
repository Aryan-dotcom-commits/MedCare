using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4ad97f2d-a888-456d-bd78-266bb536641b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b137f2f9-18e7-47b2-a893-c062a2feb37c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6e7cfa0f-92d6-450b-8156-fd146947d73b", null, "Doctor", "DOCTOR" },
                    { "dee0b6c9-b824-46ef-a70c-c24f462126d5", null, "Patient", "PATIENT" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e7cfa0f-92d6-450b-8156-fd146947d73b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dee0b6c9-b824-46ef-a70c-c24f462126d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4ad97f2d-a888-456d-bd78-266bb536641b", null, "Patient", "PATIENT" },
                    { "b137f2f9-18e7-47b2-a893-c062a2feb37c", null, "Doctor", "DOCTOR" }
                });
        }
    }
}
