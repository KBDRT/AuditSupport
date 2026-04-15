using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changes3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_EduPrograms_ProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropTable(
                name: "Checks");

            migrationBuilder.AddColumn<Guid>(
                name: "EduProgramId",
                table: "ProgramVersions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VersionId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramVersionId = table.Column<Guid>(type: "uuid", nullable: false),
                    AuditorId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Commentary = table.Column<string>(type: "text", nullable: false),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_ProgramVersions_ProgramVersionId",
                        column: x => x.ProgramVersionId,
                        principalTable: "ProgramVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_AuditorId",
                        column: x => x.AuditorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgramVersions_EduProgramId",
                table: "ProgramVersions",
                column: "EduProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AuditorId",
                table: "Reviews",
                column: "AuditorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProgramVersionId",
                table: "Reviews",
                column: "ProgramVersionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramVersions_EduPrograms_EduProgramId",
                table: "ProgramVersions",
                column: "EduProgramId",
                principalTable: "EduPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramVersions_ProgramVersions_ProgramId",
                table: "ProgramVersions",
                column: "ProgramId",
                principalTable: "ProgramVersions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_EduPrograms_EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_ProgramVersions_ProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_ProgramVersions_EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropColumn(
                name: "EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.CreateTable(
                name: "Checks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuditorId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uuid", nullable: false),
                    CheckId = table.Column<Guid>(type: "uuid", nullable: true),
                    Commentary = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Checks_Checks_CheckId",
                        column: x => x.CheckId,
                        principalTable: "Checks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Checks_ProgramVersions_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "ProgramVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Checks_Users_AuditorId",
                        column: x => x.AuditorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Checks_AuditorId",
                table: "Checks",
                column: "AuditorId");

            migrationBuilder.CreateIndex(
                name: "IX_Checks_CheckId",
                table: "Checks",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_Checks_ProgramId",
                table: "Checks",
                column: "ProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramVersions_EduPrograms_ProgramId",
                table: "ProgramVersions",
                column: "ProgramId",
                principalTable: "EduPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
