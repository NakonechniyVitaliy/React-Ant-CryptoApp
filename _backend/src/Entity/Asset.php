<?php

namespace App\Entity;

use App\Repository\AssetRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssetRepository::class)]
class Asset
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'assets')]
    private User $user;


    #[ORM\Column(length: 100)]
    private ?string $Name = null;

    #[ORM\Column]
    private ?float $PurchasePrice = null;

    #[ORM\Column(length: 10)]
    private ?string $Abbreviation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): static
    {
        $this->Name = $Name;

        return $this;
    }

    public function getPurchasePrice(): ?float
    {
        return $this->PurchasePrice;
    }

    public function setPurchasePrice(float $PurchasePrice): static
    {
        $this->PurchasePrice = $PurchasePrice;

        return $this;
    }

    public function getAbbreviation(): ?string
    {
        return $this->Abbreviation;
    }

    public function setAbbreviation(string $Abbreviation): static
    {
        $this->Abbreviation = $Abbreviation;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
