using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class upd2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Commentray",
                table: "RuleWords",
                newName: "Commentary");

            migrationBuilder.AddColumn<string>(
                name: "Commentary",
                table: "RuleSections",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Commentary",
                table: "RuleSections");

            migrationBuilder.RenameColumn(
                name: "Commentary",
                table: "RuleWords",
                newName: "Commentray");
        }
    }
}
