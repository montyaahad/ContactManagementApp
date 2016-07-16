using ContactManagement.DAL;
using ContactManagement.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ContactManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly IContactRepository _contactRepository;

        public HomeController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        #region Views
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search()
        {
            return View();
        } 
        #endregion




        #region data oriented
        public JsonResult GetAll()
        {
            var list = _contactRepository.GetAll();

            return Json(new { list }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetContacts(int take, int skip)
        {
            var list = _contactRepository.GetContacts(take, skip);

            return Json(new { list }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddOrEditContact(Contact contact)
        {
            bool result = false;

            result = _contactRepository.AddOrEdirContact(contact);

            return Json(new { result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchContact(string searchtext)
        {
            var list = _contactRepository.GetSearchedContacts(searchtext);

            return Json(new { list }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetContactsByFirstLetter(string letter)
        {
            var list = _contactRepository.GetContactsByFirstLetter(letter);

            return Json(new { list }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteContact(string id)
        {
            bool result = false;

            result = _contactRepository.DeleteContact(Convert.ToInt32(id));

            return Json(new { result }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetContactsById(string id)
        {
            var data = _contactRepository.GetContactById(Convert.ToInt32(id));

            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}