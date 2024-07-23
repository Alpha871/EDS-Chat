

namespace Application.CustomPrompt
{
    public class CustomPromptDTO
    {
        public Guid Id { get; set; }
        public string Prompt { get; set; }
        public string Emoji { get; set; }
        public DateTime CreateAt { get; set; }
    }
}