

namespace Domain
{
    public class CustomPrompt
    {
        public Guid Id { get; set; }
        public string Prompt { get; set; }
        public string Emoji { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public Company Company { get; set; }
    }
}