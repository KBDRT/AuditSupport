using Application.Abstractions.Files;
using Application.DTO.Programs;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Infrastructure.Files
{
    public class ProgramFileWordParser : IProgramFileParser
    {
        private ProgramFileStructure _fileStructure = new();

        private int _currentPosition = 0;

        private const string SECTION_TABLE_NAME = "Оглавление";

        private const int SECTION_CELLS_COUNT = 3;

        public ProgramFileStructure ParseFile(Stream fileStream)
        {
            fileStream.Position = 0;
            using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(fileStream, false))
            {
                var body = wordDoc.MainDocumentPart?.Document?.Body;
                if (body == null) return _fileStructure;

                var elements = body.Elements().ToList();
                bool isMarker = false;

                for (int i = 0; i < elements.Count; i++)
                {
                    var element = elements[i];
                    if (element is Paragraph paragraph)
                    {
                        var paragraphText = paragraph.InnerText.Trim();
                        if (!string.IsNullOrEmpty(paragraphText))
                        {
                            paragraphText = " " + paragraphText;
                            _fileStructure.FileText.AppendLine(paragraphText);
                            _currentPosition += paragraphText.Length;
                        }

                        if (!isMarker)
                        {
                            isMarker = IsTableSection(paragraph);
                            //continue;
                        }
                    }

                    if (element is Table table)
                    {
                        var tableText = table.InnerText.Trim();
                        if (!string.IsNullOrEmpty(tableText))
                        {
                            tableText = " " + tableText;
                            _fileStructure.FileText.AppendLine(tableText);
                            _currentPosition += tableText.Length;
                        }

                        if (_fileStructure.Sections.Count == 0 && isMarker && element is Table tocTable)
                        {
                            GetSections(tocTable);
                            //break;
                        }
                    }
                }
            }

            return _fileStructure;
        }

        private bool IsTableSection(Paragraph element)
        {
            var text = element.InnerText.Trim();
            if (text.Equals(SECTION_TABLE_NAME, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
            return false;
        }


        private void GetSections(Table table)
        {
            //bool isFirstRow = true;
            foreach (var row in table.Elements<TableRow>())
            {
                var cells = row.Elements<TableCell>().ToList();

                if (cells.Count == SECTION_CELLS_COUNT)
                {
                    //if (isFirstRow)
                    //{
                    //    isFirstRow = false;
                    //    continue;
                    //}

                    var orderResult = int.TryParse(cells[0].InnerText.Trim(), out var orderNumber);
                    var sectionName = cells[1].InnerText.Trim();
                    var pageResult = int.TryParse(cells[2].InnerText.Trim(), out var pageNumber);

                    _fileStructure.Sections.Add(new()
                    {
                        PageNumber = pageResult ? pageNumber : 0,
                        OrderNumber = orderResult ? orderNumber : 0,
                        SectionName = sectionName,
                        //Position = _currentPosition
                    });
                }
            }
        }

    }
}
