using ContactManagement.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactManagement.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly IContactContext context;

        public ContactRepository(IContactContext contactContext)
        {
            context = contactContext;
        }

        public List<Contact> GetAll()
        {
            List<Contact> list = (from contact in context.Contacts
                                  orderby contact.Name
                                  select contact).ToList();
            return list;
        }

        public bool AddOrEdirContact(Contact contact)
        {
            if (string.IsNullOrEmpty(contact.Name) || string.IsNullOrEmpty(contact.Phone))
            {
                return false;
            }

            try
            {
                if (contact.Id == 0)
                {
                    context.Contacts.Add(contact);
                    context.SaveChanges();
                }
                else
                {
                    Contact obj = (from c in context.Contacts
                                   where c.Id == contact.Id
                                   select c).Single();

                    obj.Name = contact.Name;
                    obj.Phone = contact.Phone;
                    obj.Email = contact.Email;
                    obj.Address = contact.Address;
                    obj.Organization = contact.Organization;

                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Contact> GetSearchedContacts(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return GetAll();
            }

            List<Contact> list = (from contact in context.Contacts
                                  where contact.Name.Contains(text.Trim()) || contact.Phone.Contains(text.Trim())
                                  orderby contact.Name
                                  select contact).ToList();
            return list;
        }

        public List<Contact> GetContactsByFirstLetter(string letter)
        {
            List<Contact> list = (from contact in context.Contacts
                                  where contact.Name.StartsWith(letter)
                                  orderby contact.Name
                                  select contact).ToList();
            return list;
        }

        public bool DeleteContact(int id)
        {
            try
            {
                Contact obj = (from contact in context.Contacts
                               where contact.Id == id
                               select contact).Single();

                context.Contacts.Remove(obj);
                context.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Contact GetContactById(int id)
        {
            Contact cont = new Contact();

            cont = (from contact in context.Contacts
                    where contact.Id == id
                    select contact).Single();

            return cont;
        }

        public List<Contact> GetContacts(int take, int skip)
        {
            List<Contact> list = (from contact in context.Contacts
                                  orderby contact.Name
                                  select contact)
                                  .Skip(skip)
                                  .Take(take)
                                  .ToList();

            return list;
        }
    }
}