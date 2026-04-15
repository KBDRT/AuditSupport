using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changes4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_EduPrograms_EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_ProgramVersions_ProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropIndex(
                name: "IX_ProgramVersions_EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.DropColumn(
                name: "EduProgramId",
                table: "ProgramVersions");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramVersions_EduPrograms_ProgramId",
                table: "ProgramVersions",
                column: "ProgramId",
                principalTable: "EduPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_EduPrograms_ProgramId",
                table: "ProgramVersions");

            migrationBuilder.AddColumn<Guid>(
                name: "EduProgramId",
                table: "ProgramVersions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProgramVersions_EduProgramId",
                table: "ProgramVersions",
                column: "EduProgramId");

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
    }
}
