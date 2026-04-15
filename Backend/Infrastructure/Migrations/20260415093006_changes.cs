using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProgramStatuses",
                table: "EduPrograms",
                newName: "ProgramStatus");

            migrationBuilder.AddColumn<double>(
                name: "FileSize",
                table: "ProgramVersions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "ProgramVersions");

            migrationBuilder.RenameColumn(
                name: "ProgramStatus",
                table: "EduPrograms",
                newName: "ProgramStatuses");
        }
    }
}
