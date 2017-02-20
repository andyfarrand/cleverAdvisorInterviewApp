using System;
using System.Collections.Generic;
using System.Linq;
using CleverAdviserApp.Domain.Entities;
using CleverAdviserApp.Domain.Abstract;

namespace CleverAdviserApp.Domain.Concrete
{
    public class InvestorService : IInvestorService
    {
        //Poor mans DI
        private readonly IInvestorRepository _repo;
        public InvestorService() : this(EFInvestorRepository.Instance) { }
        public InvestorService(IInvestorRepository repo) {  _repo = repo;  }

        //Singleton instance
        public static IInvestorService Instance { get; private set; }
        static InvestorService() { Instance = new InvestorService(); }


        
        public IEnumerable<Investor> GetAllInvestors()
        {
            return _repo.Investors.ToList();
        }

        public Investor GetInvestorById(int id)
        {
            return _repo.Investors.First(i => i.InvestorId == id);
        }


    }
}
