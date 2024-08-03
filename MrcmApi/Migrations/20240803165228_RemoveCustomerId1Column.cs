using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MrcmApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCustomerId1Column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interactions_Customers_CustomerId1",
                table: "Interactions");

            migrationBuilder.DropIndex(
                name: "IX_Interactions_CustomerId1",
                table: "Interactions");

            migrationBuilder.DropColumn(
                name: "CustomerId1",
                table: "Interactions");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "Interactions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_CustomerId",
                table: "Interactions",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interactions_Customers_CustomerId",
                table: "Interactions",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interactions_Customers_CustomerId",
                table: "Interactions");

            migrationBuilder.DropIndex(
                name: "IX_Interactions_CustomerId",
                table: "Interactions");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "Interactions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId1",
                table: "Interactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Interactions_CustomerId1",
                table: "Interactions",
                column: "CustomerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Interactions_Customers_CustomerId1",
                table: "Interactions",
                column: "CustomerId1",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
