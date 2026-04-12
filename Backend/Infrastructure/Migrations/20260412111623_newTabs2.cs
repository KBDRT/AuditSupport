using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newTabs2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EduYears",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StartYear = table.Column<int>(type: "integer", maxLength: 4, nullable: false),
                    EndYear = table.Column<int>(type: "integer", maxLength: 4, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsOpened = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EduYears", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EduPrograms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AgesOfChildrens = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<double>(type: "double precision", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    YearsId = table.Column<Guid>(type: "uuid", nullable: false),
                    DirectopnId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeacherId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramStatuses = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EduPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EduPrograms_Directions_DirectopnId",
                        column: x => x.DirectopnId,
                        principalTable: "Directions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EduPrograms_EduYears_YearsId",
                        column: x => x.YearsId,
                        principalTable: "EduYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EduPrograms_Users_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgramVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Version = table.Column<int>(type: "integer", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uuid", nullable: false),
                    Changes = table.Column<string>(type: "text", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramVersions_EduPrograms_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "EduPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Checks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uuid", nullable: false),
                    AuditorId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Commentary = table.Column<string>(type: "text", nullable: false),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false),
                    CheckId = table.Column<Guid>(type: "uuid", nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_DirectopnId",
                table: "EduPrograms",
                column: "DirectopnId");

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_TeacherId",
                table: "EduPrograms",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_YearsId",
                table: "EduPrograms",
                column: "YearsId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramVersions_ProgramId",
                table: "ProgramVersions",
                column: "ProgramId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Checks");

            migrationBuilder.DropTable(
                name: "ProgramVersions");

            migrationBuilder.DropTable(
                name: "EduPrograms");

            migrationBuilder.DropTable(
                name: "EduYears");
        }
    }
}
