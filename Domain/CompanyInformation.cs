

namespace Domain
{
    public class CompanyInformation
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Information { get; set; }

        public Company Company { get; set; }
    }
}