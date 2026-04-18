using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "ProgramVersions");

            migrationBuilder.AddColumn<double>(
                name: "FileSize",
                table: "Reviews",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "ProgramHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    OldStatus = table.Column<int>(type: "integer", nullable: false),
                    NewStatus = table.Column<int>(type: "integer", nullable: false),
                    SourceId = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramHistories_EduPrograms_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "EduPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProgramHistories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RuleSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SectionName = table.Column<string>(type: "text", nullable: false),
                    SectionNumber = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleSections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RuleWords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Word = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleWords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TechinalChecks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VersionId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramVersionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechinalChecks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TechinalChecks_ProgramVersions_ProgramVersionId",
                        column: x => x.ProgramVersionId,
                        principalTable: "ProgramVersions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CheckError",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RuleSourceId = table.Column<Guid>(type: "uuid", nullable: false),
                    RuleType = table.Column<int>(type: "integer", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Rule = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    TechCheckId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckError", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckError_TechinalChecks_TechCheckId",
                        column: x => x.TechCheckId,
                        principalTable: "TechinalChecks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckError_TechCheckId",
                table: "CheckError",
                column: "TechCheckId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramHistories_ProgramId",
                table: "ProgramHistories",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramHistories_UserId",
                table: "ProgramHistories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TechinalChecks_ProgramVersionId",
                table: "TechinalChecks",
                column: "ProgramVersionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CheckError");

            migrationBuilder.DropTable(
                name: "ProgramHistories");

            migrationBuilder.DropTable(
                name: "RuleSections");

            migrationBuilder.DropTable(
                name: "RuleWords");

            migrationBuilder.DropTable(
                name: "TechinalChecks");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "Reviews");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "ProgramVersions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
