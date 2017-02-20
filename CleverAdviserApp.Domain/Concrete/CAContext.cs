using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using CleverAdviserApp.Domain.Entities;

namespace CleverAdviserApp.Domain.Concrete
{

    public partial class CAContext : DbContext
    {
        public CAContext() : base("name=CAContext")
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Investor> Investors { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(e => e.AmountHeld)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Investor>()
                .HasMany(e => e.Accounts)
                .WithRequired(e => e.Investor)
                .WillCascadeOnDelete(false);
        }
    }
}
