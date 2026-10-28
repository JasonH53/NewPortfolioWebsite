# First Post
Hello World, testing a new feature. Here is some code.

## Some Code
```cpp
// Leetcode
#include <ranges>

class Solution {
    enum class Category {
        electronics,
        grocery,
        pharmacy,
        restaurant
    };

    static std::optional<Category> get_category(std::string_view s) noexcept {
        using enum Category;

        if (s == "electronics") 
            return electronics;
        if (s == "grocery")
            return grocery;
        if (s == "pharmacy")
            return pharmacy;
        if (s == "restaurant")
            return restaurant;
        
        return std::nullopt;
    }

    static bool valid_syntax(std::string_view code) noexcept {
        return std::ranges::all_of(code, [](char c) {
            return std::isalnum(c) || c == '_';
        });
    }
public:
    vector<string> validateCoupons(vector<string>& code, vector<string>& businessLine, vector<bool>& isActive) {
        size_t n = code.size();

        std::vector<std::pair<Category, std::string>> valid_codes;
        
        for (auto &&[code, line, active] : std::views::zip(code, businessLine, isActive)) {
            if(!active || code.empty() || !valid_syntax(code))
                continue;

            if (auto cat = get_category(line))
                valid_codes.emplace_back(*cat, code);
        }

       std::ranges::sort(valid_codes);

        return valid_codes
            | std::views::values
            | std::ranges::to<std::vector<std::string>>();
    }
};
```
