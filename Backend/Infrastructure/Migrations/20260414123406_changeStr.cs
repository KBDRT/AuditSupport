using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeStr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EduPrograms_Directions_DirectopnId",
                table: "EduPrograms");

            migrationBuilder.DropIndex(
                name: "IX_EduPrograms_DirectopnId",
                table: "EduPrograms");

            migrationBuilder.RenameColumn(
                name: "DirectopnId",
                table: "EduPrograms",
                newName: "YearId");

            migrationBuilder.AddColumn<Guid>(
                name: "DirectionId",
                table: "EduPrograms",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_DirectionId",
                table: "EduPrograms",
                column: "DirectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_EduPrograms_Directions_DirectionId",
                table: "EduPrograms",
                column: "DirectionId",
                principalTable: "Directions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EduPrograms_Directions_DirectionId",
                table: "EduPrograms");

            migrationBuilder.DropIndex(
                name: "IX_EduPrograms_DirectionId",
                table: "EduPrograms");

            migrationBuilder.DropColumn(
                name: "DirectionId",
                table: "EduPrograms");

            migrationBuilder.RenameColumn(
                name: "YearId",
                table: "EduPrograms",
                newName: "DirectopnId");

            migrationBuilder.CreateIndex(
                name: "IX_EduPrograms_DirectopnId",
                table: "EduPrograms",
                column: "DirectopnId");

            migrationBuilder.AddForeignKey(
                name: "FK_EduPrograms_Directions_DirectopnId",
                table: "EduPrograms",
                column: "DirectopnId",
                principalTable: "Directions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
