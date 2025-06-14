```python
from manim import *

class PythagorasTheorem(Scene):
    def construct(self):
        # Scene setup
        self.camera.background_color = "#111111"

        # Define colors
        COLOR_A = BLUE_D
        COLOR_B = YELLOW_D
        COLOR_C = WHITE

        # Define triangle vertices
        A = ORIGIN
        B = RIGHT * 3
        C = UP * 4
        triangle = Polygon(A, B, C, color=WHITE, stroke_width=3)

        # Label sides
        a = Line(A, C, color=COLOR_A, stroke_width=3)
        b = Line(A, B, color=COLOR_B, stroke_width=3)
        c = Line(B, C, color=COLOR_C, stroke_width=3)

        text_a = MathTex("a", color=COLOR_A).next_to(a, LEFT)
        text_b = MathTex("b", color=COLOR_B).next_to(b, DOWN)
        text_c = MathTex("c", color=COLOR_C).next_to(c, UP + RIGHT)

        # Right angle marker
        right_angle = RightAngle(b, a, length=0.5, color=WHITE)

        # Introduction
        theorem_text = Tex("Pythagorean Theorem").scale(1.2).to_edge(UP)
        self.play(Write(theorem_text))
        self.wait(1)

        self.play(Create(triangle), Create(a), Create(b), Create(c), Create(right_angle))
        self.play(Write(text_a), Write(text_b), Write(text_c))
        self.wait(1)

        # Equation
        equation = MathTex("a^2", "+", "b^2", "=", "c^2").scale(1.2).to_edge(DOWN)
        equation[0].set_color(COLOR_A)
        equation[2].set_color(COLOR_B)
        equation[4].set_color(COLOR_C)

        self.play(Write(equation))
        self.wait(1)

        # Squares
        square_a = Square(side_length=a.get_length(), color=COLOR_A, fill_opacity=0.5).move_to(A + (a.get_center() - A)/2).rotate(a.get_angle())
        square_b = Square(side_length=b.get_length(), color=COLOR_B, fill_opacity=0.5).move_to(A + (b.get_center() - A)/2).rotate(b.get_angle())
        square_c = Square(side_length=c.get_length(), color=COLOR_C, fill_opacity=0.5).move_to(B + (c.get_center() - B)/2).rotate(c.get_angle())


        text_a_squared = MathTex("a^2", color=COLOR_A).move_to(square_a.get_center())
        text_b_squared = MathTex("b^2", color=COLOR_B).move_to(square_b.get_center())
        text_c_squared = MathTex("c^2", color=COLOR_C).move_to(square_c.get_center())

        self.play(Create(square_a), Write(text_a_squared))
        self.play(Create(square_b), Write(text_b_squared))
        self.play(Create(square_c), Write(text_c_squared))
        self.wait(2)

        #Highlight relation
        self.play(
            square_a.animate.set_fill(opacity=0.8),
            square_b.animate.set_fill(opacity=0.8),
        )
        self.wait(1)

        #Clean up
        self.play(
            FadeOut(square_a),
            FadeOut(square_b),
            FadeOut(square_c),
            FadeOut(text_a_squared),
            FadeOut(text_b_squared),
            FadeOut(text_c_squared),
            FadeOut(theorem_text),
            FadeOut(equation),
            FadeOut(triangle),
            FadeOut(a),
            FadeOut(b),
            FadeOut(c),
            FadeOut(text_a),
            FadeOut(text_b),
            FadeOut(text_c),
            FadeOut(right_angle)
        )
        self.wait(1)

        final_text = Tex("The sum of the areas of the squares on the legs (a and b) ", "equals ", "the area of the square on the hypotenuse (c).").scale(0.8)
        final_text[0].set_color(YELLOW)
        final_text[1].set_color(WHITE)
        final_text[2].set_color(BLUE)

        self.play(Write(final_text))
        self.wait(3)
```