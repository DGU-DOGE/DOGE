package com.doge.backend.admin;

import com.doge.backend.domain.book.Book;
import com.doge.backend.domain.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/members")
    public String members(Model model) {
        List<Member> members = adminService.findMembers();
        model.addAttribute("members", members);
        return "/memberList";
    }

    @GetMapping("/books")
    public String books(Model model){
        List<Book> books = adminService.findBooks();
        model.addAttribute("books", books);
        return "/bookList";
    }
}
