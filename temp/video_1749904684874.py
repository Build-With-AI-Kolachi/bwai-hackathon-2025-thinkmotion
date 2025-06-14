```python
from manim import *

class BinomialTheorem(Scene):
    def construct(self):
        # Set background color
        self.camera.background_color = "#111111"

        # Title
        title = Text("The Binomial Theorem", color=YELLOW).scale(1.2)
        self.play(Write(title), run_time=1.5)
        self.wait(0.5)
        self.play(FadeOut(title))

        # Expansion example
        expansion = MathTex(r"(a + b)^2 = a^2 + 2ab + b^2", color=WHITE).scale(1)
        self.play(Write(expansion), run_time=1)
        self.wait(1)
        self.play(FadeOut(expansion))

        # Pascal's Triangle
        pascal_triangle = VGroup()
        rows = 6
        for i in range(rows):
            row = VGroup()
            for j in range(i + 1):
                num = Text(str(int(math.comb(i, j))), color=BLUE).scale(0.7)
                row.add(num)
            row.arrange(RIGHT)
            pascal_triangle.add(row)
        pascal_triangle.arrange(DOWN)

        self.play(Write(pascal_triangle), run_time=2)
        self.wait(1)

        #Highlight 2nd row, and expand it
        row_to_highlight = pascal_triangle[2]
        self.play(row_to_highlight.animate.set_color(YELLOW))
        self.wait(0.5)

        explanation = MathTex(r"(a+b)^2 = 1a^2 + 2ab + 1b^2", color=WHITE).scale(1)
        explanation.next_to(pascal_triangle, DOWN, buff=0.5)
        self.play(Write(explanation), run_time=1.5)
        self.wait(1)
        self.play(FadeOut(pascal_triangle, explanation))

        # Combinations formula
        combination_formula = MathTex(r"\binom{n}{k} = \frac{n!}{k!(n-k)!}", color=WHITE).scale(1)
        self.play(Write(combination_formula), run_time=1.5)
        self.wait(1)

        explanation_formula = Text("Number of ways to choose k items from n", color=BLUE).scale(0.7)
        explanation_formula.next_to(combination_formula, DOWN, buff=0.5)
        self.play(Write(explanation_formula), run_time=1)
        self.wait(1)
        self.play(FadeOut(combination_formula, explanation_formula))

        # General Formula
        general_formula = MathTex(r"(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^k", color=WHITE).scale(1)
        self.play(Write(general_formula), run_time=2)
        self.wait(2)

        # Final Fade Out
        self.play(FadeOut(general_formula))
        self.wait(0.5)
```