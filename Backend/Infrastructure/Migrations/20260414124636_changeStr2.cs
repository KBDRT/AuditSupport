using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeStr2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EduPrograms_EduYears_YearsId",
                table: "EduPrograms");

            migrationBuilder.DropIndex(
                name: "IX_EduPrograms_YearsId",
                table: "EduPrograms");

            migrationBuilder.DropColumn(
                name: "YearsId",
                table: "EduPrograms");

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_YearId",
                table: "EduPrograms",
                column: "YearId");

            migrationBuilder.AddForeignKey(
                name: "FK_EduPrograms_EduYears_YearId",
                table: "EduPrograms",
                column: "YearId",
                principalTable: "EduYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EduPrograms_EduYears_YearId",
                table: "EduPrograms");

            migrationBuilder.DropIndex(
                name: "IX_EduPrograms_YearId",
                table: "EduPrograms");

            migrationBuilder.AddColumn<Guid>(
                name: "YearsId",
                table: "EduPrograms",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_YearsId",
                table: "EduPrograms",
                column: "YearsId");

            migrationBuilder.AddForeignKey(
                name: "FK_EduPrograms_EduYears_YearsId",
                table: "EduPrograms",
                column: "YearsId",
                principalTable: "EduYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
