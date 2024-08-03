using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MrcmApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInteractionRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Interactions");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId1",
                table: "Interactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserInteraction",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    InteractionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInteraction", x => new { x.UserId, x.InteractionId });
                    table.ForeignKey(
                        name: "FK_UserInteraction_Interactions_InteractionId",
                        column: x => x.InteractionId,
                        principalTable: "Interactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserInteraction_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_CustomerId1",
                table: "Interactions",
                column: "CustomerId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserInteraction_InteractionId",
                table: "UserInteraction",
                column: "InteractionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interactions_Customers_CustomerId1",
                table: "Interactions",
                column: "CustomerId1",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interactions_Customers_CustomerId1",
                table: "Interactions");

            migrationBuilder.DropTable(
                name: "UserInteraction");

            migrationBuilder.DropIndex(
                name: "IX_Interactions_CustomerId1",
                table: "Interactions");

            migrationBuilder.DropColumn(
                name: "CustomerId1",
                table: "Interactions");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Interactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
