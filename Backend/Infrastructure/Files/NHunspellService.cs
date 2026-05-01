using Application.Abstractions.Files;
using WeCantSpell.Hunspell;

namespace Infrastructure.Files
{
    public class NHunspellService : INHunspellService
    {
        private readonly WordList _hunspell;

        public NHunspellService()
        {
            _hunspell = WordList.CreateFromFiles(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ru_RU.dic"));
        }

        // 1. Проверка орфографии
        public bool SpellCheck(string word)
        {
            return _hunspell.Check(word);
        }

        // 2. Получение вариантов исправлений (до 10)
        public List<string> GetSuggestions(string word)
        {
            return _hunspell.Suggest(word).ToList();
        }

        // 3. Стемминг (приведение к основе)
        public List<string> GetStems(string word)
        {
            var test = _hunspell.CheckDetails(word);
            return [];
            //return _hunspell(word).ToList();
        }

        // 4. Получение корня слова (один вариант)
        public string GetRoot(string word)
        {
            return "";
            //var stems = _hunspell.Stem(word);
            //return stems.FirstOrDefault() ?? word;
        }

        // 5. Разбор слова по морфологии
        public List<string> Analyze(string word)
        {
            return [];
            //return _hunspell.Analyze(word).ToList();
        }

        // 6. Генерация словоформ
        public List<string> Generate(string word, string example)
        {
            return [];
            //return _hunspell.Generate(word, example).ToList();
        }

        // 7. Добавление слова в пользовательский словарь
        public void AddWord(string word)
        {
            _hunspell.Add(word);
        }

        // 8. Удаление слова из словаря
        public void RemoveWord(string word)
        {
            _hunspell.Remove(word);
        }

        // 9. Проверка с учётом регистра и Unicode
        public bool SpellCheckWithCase(string word)
        {
            return true;
            //return _hunspell.Spell(word);
        }

        // 10. Получение информации о словаре
        public string GetDictionaryEncoding()
        {
            return "";
            //return _hunspell.GetDictionaryEncoding();
        }

        // 11. Очистка пользовательских слов
        public void ClearCustomWords()
        {
            //_hunspell.Clear();
        }
    }
}
