from transformers import GPT2Tokenizer

# Initialize the GPT-2 tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Your text goes here
text = "OTF Durk is a boss with a reputation not to be trifled with, but it's a simple car break-in that kicks off the events that will lead to a terrifying home invasion and shootout at his gated mansion. When Kayla B's chain is stolen and Glizzy Gang refuse to return it unless they're paid, OTF Durk takes it personally. With Lil Baby mediating, it seems the issue is going to be resolved amicably, but Glizzy Gang's refusal sets off a chain of events that will have grave consequences for them. From gun battles to bounty-hunting, this story delves deep into the bloody world of Atlanta's rap scene and shows just how high the stakes can be when you don't choose your battles wisely."

# Tokenize the text
tokens = tokenizer.encode(text)

# Count the number of tokens
num_tokens = len(tokens)

print(f"The text is {num_tokens} tokens long.")

