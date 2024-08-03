using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MrcmApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserInteraction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "UserInteraction",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "id",
                table: "UserInteraction");
        }
    }
}
