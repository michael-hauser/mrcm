using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MrcmApi.Migrations
{
    /// <inheritdoc />
    public partial class IdentityUserInteractionV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                    name: "UserInteraction",
                    columns: table => new
                    {
                        Id = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"), // Ensures auto-increment
                        UserId = table.Column<int>(type: "int", nullable: false),
                        InteractionId = table.Column<int>(type: "int", nullable: false)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_UserInteraction", x => new { x.UserId, x.InteractionId });
                        table.ForeignKey(
                            name: "FK_UserInteraction_Interaction_InteractionId",
                            column: x => x.InteractionId,
                            principalTable: "Interactions",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade);
                        table.ForeignKey(
                            name: "FK_UserInteraction_User_UserId",
                            column: x => x.UserId,
                            principalTable: "Users",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade);
                    });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                    name: "UserInteraction");
        }
    }
}
