using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagement.DAL
{
    public interface IContactContext
    {
        DbSet<Contact> Contacts { get; set; }

        int SaveChanges();
    }
}
