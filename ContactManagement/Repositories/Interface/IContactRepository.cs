using ContactManagement.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagement.Repositories
{
    public interface IContactRepository
    {
        List<Contact> GetAll();
        bool AddOrEdirContact(Contact contact);
        List<Contact> GetSearchedContacts(string text);
        List<Contact> GetContactsByFirstLetter(string letter);
        bool DeleteContact(int id);
        Contact GetContactById(int id);
        List<Contact> GetContacts(int take, int skip);
    }
}
