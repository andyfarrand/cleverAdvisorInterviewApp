using CleverAdviserApp.Domain.Abstract;
using CleverAdviserApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleverAdviserApp.Domain.Concrete
{
    class EFInvestorRepository : IInvestorRepository
    {
        private CAContext context = new CAContext();
        public static IInvestorRepository Instance { get; private set; }
        static EFInvestorRepository()
        {
            Instance = new EFInvestorRepository();
        }

        public IQueryable<Investor> Investors
        {
            get { return context.Investors; }
        }
    }
}
