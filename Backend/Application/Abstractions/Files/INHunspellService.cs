namespace Application.Abstractions.Files
{
    public interface INHunspellService
    {
        void AddWord(string word);
        List<string> Analyze(string word);
        void ClearCustomWords();
        List<string> Generate(string word, string example);
        string GetDictionaryEncoding();
        string GetRoot(string word);
        List<string> GetStems(string word);
        List<string> GetSuggestions(string word);
        void RemoveWord(string word);
        bool SpellCheck(string word);
        bool SpellCheckWithCase(string word);


    }
}
