using System.Linq;
using CleverAdviserApp.Domain.Entities;

namespace CleverAdviserApp.Domain.Abstract
{
    public interface IInvestorRepository
    {
        IQueryable<Investor> Investors { get; }
    }
}
