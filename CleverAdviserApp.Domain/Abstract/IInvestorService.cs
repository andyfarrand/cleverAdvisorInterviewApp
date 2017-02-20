using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleverAdviserApp.Domain.Entities;

namespace CleverAdviserApp.Domain.Abstract
{
    public interface IInvestorService
    {
        IEnumerable<Investor> GetAllInvestors();
        Investor GetInvestorById(int id);
     }
}
