using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MrcmApi.Migrations
{
    /// <inheritdoc />
    public partial class IdentityUserInteraction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "UserInteraction",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserInteraction",
                newName: "id");
        }
    }
}
