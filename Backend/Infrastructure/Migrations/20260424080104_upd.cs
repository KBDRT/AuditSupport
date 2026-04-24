using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class upd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TechinalChecks_ProgramVersions_ProgramVersionId",
                table: "TechinalChecks");

            migrationBuilder.DropIndex(
                name: "IX_TechinalChecks_ProgramVersionId",
                table: "TechinalChecks");

            migrationBuilder.DropColumn(
                name: "ProgramVersionId",
                table: "TechinalChecks");

            migrationBuilder.AddColumn<string>(
                name: "Commentray",
                table: "RuleWords",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "RuleSections",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "TechCheckId",
                table: "ProgramVersions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "RuleStructures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    SectionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleStructures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RuleStructures_RuleSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "RuleSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgramVersions_TechCheckId",
                table: "ProgramVersions",
                column: "TechCheckId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RuleStructures_SectionId",
                table: "RuleStructures",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramVersions_TechinalChecks_TechCheckId",
                table: "ProgramVersions",
                column: "TechCheckId",
                principalTable: "TechinalChecks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramVersions_TechinalChecks_TechCheckId",
                table: "ProgramVersions");

            migrationBuilder.DropTable(
                name: "RuleStructures");

            migrationBuilder.DropIndex(
                name: "IX_ProgramVersions_TechCheckId",
                table: "ProgramVersions");

            migrationBuilder.DropColumn(
                name: "Commentray",
                table: "RuleWords");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "RuleSections");

            migrationBuilder.DropColumn(
                name: "TechCheckId",
                table: "ProgramVersions");

            migrationBuilder.AddColumn<Guid>(
                name: "ProgramVersionId",
                table: "TechinalChecks",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TechinalChecks_ProgramVersionId",
                table: "TechinalChecks",
                column: "ProgramVersionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TechinalChecks_ProgramVersions_ProgramVersionId",
                table: "TechinalChecks",
                column: "ProgramVersionId",
                principalTable: "ProgramVersions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
