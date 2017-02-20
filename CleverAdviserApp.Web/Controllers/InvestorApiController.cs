using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CleverAdviserApp.Domain.Abstract;
using CleverAdviserApp.Domain.Concrete;
using CleverAdviserApp.Domain.Entities;

namespace CleverAdviserApp.Web.Controllers
{
    public class InvestorApiController : ApiController
    {
        private IInvestorService _service;
        public InvestorApiController(IInvestorService service) { _service = service; }
        public InvestorApiController() : this(InvestorService.Instance) { }

        [HttpGet]
        [Route("api/investors")]
        public IHttpActionResult Get()
        {
            return Ok(_service.GetAllInvestors());
        }

        [HttpGet]
        [Route("api/investors/{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var investor = _service.GetInvestorById(id);
            if (investor != null)
            {
                return Ok(investor);
            }
            return NotFound();
        }
    }
}
